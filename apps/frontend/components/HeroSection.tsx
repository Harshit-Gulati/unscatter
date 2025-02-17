import HeroButton from "./Hero/HeroButton";
import SubTitle from "./Hero/SubTitle";
import Title from "./Hero/Title";
import TopTag from "./Hero/TopTag";

export const HeroSection = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-300">
      <section className="px-4 text-center">
        <TopTag />
        <Title />
        <SubTitle />
        <HeroButton />
      </section>
    </div>
  );
};
