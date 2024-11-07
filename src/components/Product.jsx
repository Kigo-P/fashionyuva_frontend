import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, i }) => {
  return (
    <Link
      to="/"
      className="w-[300px] xs:w-[205px] mb-4 border border-black rounded-md shadow-sm"
    >
      <div className="w-full">
        <div className="h-[200px] w-full rounded overflow-hidden bg-white relative pt-2">
          <img
            src={`https://picsum.photos/400/300?id=${i + 1}`}
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
        <div className="mt-2 mx-3 mb-2">
          <h1 className="text-black cursor-pointer overflow-hidden text-ellipsis line-clamp-2 font-medium text-[.9rem] leading-4 max-h-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto et
            possimus assumenda exercitationem ipsum beatae?
          </h1>
          <div className="flex gap-2 items-end mt-2">
            <span className="bg-[#242424] text-white rounded-2xl text-[11px] py-1 px-2">
              Ksh 5000.00
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
