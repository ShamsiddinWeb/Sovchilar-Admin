const Header = ({data}) => {
  return (
    <div className="text-[16px] mb-10">
        <p><span className="font-medium">Tashkilot nomi: </span><span>{data?.title}</span></p>
        <p><span className="font-medium">Tashkilot manzili: </span><span>{data?.address}</span></p>
        <p><span className="font-medium">Tashkilot telefoni: </span><span>{data?.phone}</span></p>
    </div>
  )
}

export default Header