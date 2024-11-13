import React, { useState, useEffect } from 'react'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Alert, AlertDescription } from '@/components/ui/alert'
import { Phone, CreditCard, Check, AlertCircle, Loader } from 'lucide-react'

const PaymentStatus = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
}

const Mpesa = ({ amount, orderId, onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [status, setStatus] = useState(PaymentStatus.IDLE)
  const [error, setError] = useState('')
  const [checkoutRequestId, setCheckoutRequestId] = useState(null)

  useEffect(() => {
    let pollInterval

    if (checkoutRequestId) {
      pollInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/payment/status/${checkoutRequestId}`
          )
          const data = await response.json()
          if (data.status === 'completed') {
            setStatus(PaymentStatus.SUCCESS)
            onSuccess(data)
            clearInterval(pollInterval)
          } else if (data.status === 'failed') {
            setStatus(PaymentStatus.ERROR)
            setError(data.resultDesc)
            clearInterval(pollInterval)
          }
        } catch (err) {
          console.error('Error polling payment status:', err)
        }
      }, 5000)
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [checkoutRequestId, onSuccess])

  const handlePayment = async () => {
    try {
      setStatus(PaymentStatus.PROCESSING)
      setError('')

      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          amount: amount,
          order_id: orderId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setCheckoutRequestId(data.CheckoutRequestID)
      } else {
        setStatus(PaymentStatus.ERROR)
        setError(data.error || 'Payment initiation failed')
      }
    } catch (err) {
      setStatus(PaymentStatus.ERROR)
      setError('Failed to process payment. Please try again.')
    }
  }

  if (status === PaymentStatus.SUCCESS) {
    return (
      <Alert className="bg-white border-2 border-black">
        <Check className="h-4 w-4 text-black" />
        <AlertDescription className="text-black font-medium">
          Payment completed successfully! Thank you for your purchase.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-2 border-black">
      <CardHeader className="border-b border-black">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-black" />
          <CardTitle className="text-black">M-Pesa Payment</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Amount
            </label>
            <div className="text-xl font-bold text-black">KES {amount}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
              <Input
                type="tel"
                placeholder="+254XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 border-2 border-black focus:ring-black focus:border-black bg-white text-black placeholder:text-gray-500"
                disabled={status === PaymentStatus.PROCESSING}
              />
            </div>
          </div>

          {error && (
            <Alert className="border-2 border-black bg-white">
              <AlertCircle className="h-4 w-4 text-black" />
              <AlertDescription className="text-black font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {status === PaymentStatus.PROCESSING ? (
            <Alert className="border-2 border-black bg-white">
              <Loader className="h-4 w-4 animate-spin text-black" />
              <AlertDescription className="text-black font-medium">
                Please check your phone for the M-Pesa prompt...
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={handlePayment}
              disabled={!phoneNumber || status === PaymentStatus.PROCESSING}
              className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with M-Pesa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Mpesa
