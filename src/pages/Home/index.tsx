import { useState } from "react";
import ServiceConfigurator from "../../components/ConfiguratorForm";
import Header from "../../components/Header";

const Home = () => {
  const [startForm, setStartForm] = useState<boolean>(false);
  return (
    <div className={" bg-custom-background min-h-screen flex flex-col"}>
      <Header />
      {!startForm ? (
        <div className={"flex-1 flex justify-center"}>
          <div
            className={
              "flex flex-col items-center justify-center gap-[20px] w-[540px]"
            }
          >
            <img src="src/assets/images/tools-icon.svg" />
            <h2 className={"text-custom-primary font-bold"}>
              Konfigurator servisa
            </h2>
            <h4 className={"text-custom-black text-center"}>
              Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i
              naš stručan tim će vam se javiti u najkraćem mogućem roku.
            </h4>
            <button
              onClick={() => setStartForm(true)}
              className={
                "py-[5px] px-[20px] bg-custom-primary text-white rounded-[3px] duration-300 hover:bg-custom-primary-200"
              }
            >
              <h4>Pokreni konfigurator</h4>
            </button>
          </div>
        </div>
      ) : (
        <ServiceConfigurator />
      )}
    </div>
  );
};

export default Home;
