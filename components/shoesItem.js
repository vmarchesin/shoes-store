import Link from 'next/link'

const ShoesItem = ({shoe, index}) => {
  const { img, name, nameUrl, classOne, classTwo } = shoe

  let isEven = ''
  if (index % 2 == 0) {
    isEven = 'par'
  } else {
    isEven = 'inpar'
  }

  return (
    <Link href={ `/shoes/${nameUrl}`} >
      <a className={`a-product ${classOne} ${classTwo} ${isEven}` } >
        <div className="product">
          <div className="img-product">
            <img src={`/images/${img}`} alt="" />
          </div>
          <div className="text-product">
            <span className="year">{name}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ShoesItem;