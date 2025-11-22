import { Link } from "react-router-dom";
import React from "react";
import { useStore } from "./StoreProvider";

interface Deal {
  dealID: string;
  storeID: string;
  price: number;
  retailPrice: number;
}

interface GameDealsProps {
  deals: Deal[];
}

const GameDealsComponent: React.FC<GameDealsProps> = ({ deals }) => {

  const { stores } = useStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => {
        const store = stores?.find((s) => s.storeID === deal.storeID);

        return (
          <div key={deal.dealID}>
            <button className="bg-gray-800 hover:bg-gray-900 text-white rounded px-4 py-2 inline-block w-auto max-w-max shadow">
              <Link
                to={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                {store?.images?.logo && (
                  <img
                    src={`https://www.cheapshark.com${store.images.logo}`}
                    alt={store.storeName}
                    className="w-10 h-10 object-contain"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold">
                    {store?.storeName}
                  </p>
                  <p>
                    Price : {deal.price} €{" "}
                    <span className="text-gray-300">
                      (Retail : {deal.retailPrice} €)
                    </span>
                  </p>
                </div>
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );

};

export const GameDeals = React.memo(GameDealsComponent);
