import { Card } from "../UI/index.js";
import { data } from "../constants/index.js";

const CardTable = () => {
    return (
        <div className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-6 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
            {data.directions.map((item, i) => (
                <div
                    key={item.title}
                    className="w-[85vw] flex-shrink-0 snap-center sm:w-auto sm:flex-shrink-1"
                >
                    <Card
                        index={i}
                        scene={item.scene}
                        title={item.title}
                        description={item.description}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardTable;
