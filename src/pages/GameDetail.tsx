import { useParams } from "react-router-dom";
import { useFetch } from "../customhooks/useFetch";
import { GameDeals } from "../components/GameDeals";
import { useTheme } from "../components/ThemeProvider";

interface GameDetailType {
    cheapestPriceEver: {
        date: number;
        price: number;
    }
    deals: Array<{
        dealID: string;
        price: number;
        retailPrice: number;
        savings: number;
        storeID: string;
    }>;
    info: {
        steamAppID: string;
        thumb: string;
        title: string;
    };

}

export function GameDetail(){
    const params = useParams();
    const id = params.id;

    const { theme } = useTheme();

    const gameDetail = useFetch<GameDetailType>(`https://www.cheapshark.com/api/1.0/games?id=${id}`);

    if(!gameDetail){
        return <h1 className={theme === "light" ? "text-gray-700" : "text-gray-100"}>Loading...</h1>
    }
    
    const now = new Date();
    const expiredDate = new Date(gameDetail.cheapestPriceEver.date * 1000);

    const isExpired = expiredDate < now;

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC"
    }).format(expiredDate);

    return (
        <>            
            <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      
                <div className="flex-shrink-0 w-full lg:w-1/3">
                  <img
                      src={gameDetail.info.thumb}
                      alt={gameDetail.info.title}
                      className="rounded-lg shadow-lg object-cover w-full h-auto"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-2/3 text-left">
                  <h1 className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>{gameDetail.info.title}</h1>

                  <div className={theme === "light" ? "text-gray-700" : "text-gray-200"}>
                    <p>
                        <span className="font-bold">
                            Cheapest Price Ever : {gameDetail.cheapestPriceEver.price} €
                            {" ("}
                            {isExpired ? "expired on" : "will expire on"} {formattedDate}
                            {")"}
                        </span>
                    </p>
                    <hr className="my-2"></hr>
                    <p className="my-2"><span className="font-semibold">Current deals</span></p>
            
                    <GameDeals 
                        deals = {gameDetail.deals}
                    />

                  </div>
                </div>
            </div>
        </>
    )
}