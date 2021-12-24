import Link from 'next/link';

const BestSellers = ({ bestSellers, routerUrl }) => {

  return (
    <div className="best-sellers">
      <div className="best-sellers__title">Best Sellers</div>
      {bestSellers.length > 0 &&
        bestSellers.map(item => (
          item.nameUrl !== routerUrl &&
          <a href={`/shoes/${item.nameUrl}`} key={item.id}>
            <div className="best-sellers__item">
              <img src={`/images/${item.img}`} alt={item.name} />
              <div className="best-sellers__item-name">{item.name}</div>
            </div>
          </a>
        ))
      }
    </div>
  )
};

export default BestSellers;