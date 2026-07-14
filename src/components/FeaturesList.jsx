import { icons, data } from "../constants";
import Feature from "../UI/Feature";

const FEATURES = [
  { icon: icons.Quality, title: "Quality", key: "Quality" },
  { icon: icons.Customization, title: "Customization", key: "Customization" },
  { icon: icons.Simplicity, title: "Simplicity", key: "Simplicity" },
  { icon: icons.Support, title: "Support", key: "Support" },
];

const FeaturesList = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f) => (
        <Feature
          key={f.key}
          icon={f.icon}
          title={f.title}
          description={data.featureDescription[f.key]}
        />
      ))}
    </div>
  );
};

export default FeaturesList;
