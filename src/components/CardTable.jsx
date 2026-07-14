import { Card } from "../UI/index.js";
import { data } from "../constants/index.js";

const CardTable = () => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.directions.map((item, i) => (
                <Card
                    key={item.title}
                    index={i}
                    scene={item.scene}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </div>
    );
};

export default CardTable;
