"use client";

import { useEffect, useState, useRef } from "react";
import UserNavbar from "../Components/UserNavbar";
import Accordion from "../Components/Accordion";
import Footer from "../Components/Footer";
import PieChart from "../Components/PieChart";
import uscities from "../public/data/USCities.json";
import stateRiskAssessment from "../public/data/static_state_risk_assesment.json";
import regionalAlertDescription from "../public/data/regional_alert.json";
import axios from "axios";

const Dashboard = () => {
  const [zipCode, setZipCode] = useState(501);
  const [earthquake, setEarthquake] = useState(0);
  const [fire, setFire] = useState(0);
  const [flood, setFlood] = useState(0);
  const [freeze, setFreeze] = useState(0);
  const [terrorism, setTerrorism] = useState(0);
  const [civilUnrest, setCivilUnrest] = useState(0);
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [regionalAlert, setRegionalAlert] = useState("");
  const [regionalAlertTitle, setRegionalAlertTitle] = useState("");

  const [maxValue, setMaxValue] = useState("");

  const checkButton = useRef();
  const email = useRef();
  const userIp = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData(zipCode);
  }, [city, earthquake, fire, freeze, flood, civilUnrest, terrorism, maxValue]);

  const loadData = (pincode) => {
    uscities.map((cityObj) => {
      if (cityObj.zip_code === pincode) {
        setCity(cityObj.state);
      }
    });

    if (city.length !== 0) {
      let obj = stateRiskAssessment[city];

      setEarthquake(obj["Earthquake"]);
      setFire(obj["Fire"]);
      setFreeze(obj["Freeze"]);
      setFlood(obj["Flood/Storms"]);
      setCivilUnrest(obj["Civil Unrest"]);
      setTerrorism(obj["Terrorist Attack"]);
      // console.log(earthquake, fire, freeze, flood, civilUnrest, terrorism);

      const temp = [
        { name: "Earthquake", count: earthquake },
        { name: "Fire", count: fire },
        { name: "Flood/Storms", count: flood },
        { name: "Freeze", count: freeze },
        { name: "Terrorist Attack", count: terrorism },
        { name: "Civil Unrest", count: civilUnrest },
      ];
      setData(temp);

      let max = 0;
      temp.map((obj) => {
        if(max < obj.count) {
          max = obj.count;
          setMaxValue(obj["name"]);
        }
      });

      regionalAlertDescription["regionalAlerts"].map((obj) => {
        // console.log(obj);
        if(obj["alertType"] === maxValue) {
          setRegionalAlert(obj["description"]);
          setRegionalAlertTitle(obj["title"]);
        }
      })


      console.log(regionalAlert);
    }
  };

  const accordionItems = [
    {
      title: "Section 1",
      content: "Content for Section 1",
    },
    {
      title: "Section 2",
      content: "Content for Section 2",
    },
    {
      title: "Section 3",
      content: "Content for Section 3",
    },
  ];

  const handleGenerateReport = async () => {
    const isEmailValid =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email.current.value);
    if (isEmailValid) {
      const User = await axios.post("/addnewuser", { email: email.current.value, zipcode: zipCode });
      
      if(User) {
        setZipCode(parseInt(userIp.current.value));
        loadData(parseInt(userIp.current.value));
        setShowModal(false);
      } else {
        console.log("Some error occurred, Please try again after some time");
      }
    } else {
      console.log("Please enter a valid email address");
    }
  };

  const getRiskReport = () => {
    if (userIp && userIp.current.value.length !== 0) {
      checkButton.current.click();
    } else {
      console.log("User input is empty");
    }
  };

  useEffect(() => {
    document.title = "Risk Report";
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="container mx-4 md:mx-auto min-h-screen ">
        <div className="text-3xl text-red-800">Risk Report</div>

        <div className="flex items-center gap-3">
          <div className="">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Enter Your ZIP Code:
            </label>
          </div>
          <div className="">
            <input
              className=" appearance-none border-2 border-gray-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black"
              id="inline-full-name"
              type="text"
              // onChange={handleZipCodeChange}
              ref={userIp}
            />
          </div>
          <div>
            <button
              className="bg-gray-200 px-4 py-1 border-black border-2"
              onClick={getRiskReport}
            >
              Check Risk
            </button>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="block md:hidden">
          <Accordion items={accordionItems} />
        </div>

        <div className="hidden md:block">
          <div className="flex-row ">
            <div>Earthquake: {earthquake}%</div>
            <div>Fire: {fire}%</div>
            <div>Flood/Storms: {flood}%</div>
            <div>Freeze: {freeze} %</div>
            <div>Terrorist Attack: {terrorism}%</div>
            <div>Civil Unrest: {civilUnrest}%</div>
          </div>
          <div className="flex-row space-y-4 my-4">
            <div className="flex gap-4 justify-between">
              <div className="border-4 border-black p-4 flex-1 ">
                <div className="max-w-fit font-bold text-xl">
                  {regionalAlertTitle}
                </div>
                <div className="text-justify">
                  {regionalAlert}
                </div>
              </div>
              <div className="border-4 border-white p-4 flex-1">
                <div>
                  {data.length > 0 ? (
                    <PieChart
                      labels={data.map((x) => x.name)}
                      data={data.map((y) => y.count)}
                    />
                  ) : null}
                </div>
              </div>
              <div className="border-4 border-black p-4 flex-1">
                <div className="max-w-fit font-bold text-xl">
                  Global High Alert: Hate Crimes
                </div>
                <div className="text-justify">
                  The U.S. Department of Homeland Security has issued a warning
                  that the intensification of Israeli airstrikes on Hamas
                  targets and a possible ground incursion into Gaza will keep
                  the United States on a heightened threat environment in the
                  near-to-medium term.
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-between">
              <div className="border-4 border-black p-4 flex-1">
                <div className="max-w-fit font-bold text-xl uppercase">
                  Customer gear Kit Recommended
                </div>
                <div className="text-justify">
                  <ul className="list-disc ml-4">
                    <li>Waterproof bags for important documents</li>
                    <li>Emergency Water Filter</li>
                    <li>Non-perishable food for 3 days</li>
                    <li>Flashlifht with 3 extra batteries</li>
                    <li>Inflatable raft or floatation device</li>
                  </ul>
                </div>
              </div>
              <div className="border-4 border-black p-4 flex-1">
                <div className="max-w-fit font-bold text-xl uppercase">
                  Financial Security Recommendations
                </div>
                <div className="text-justify">
                  <ul className="list-disc ml-4">
                    <li>
                      Keep important documents (like insurance, titles,
                      identification) in a waterproof container.
                    </li>
                    <li>Consider flood insurance if not already covered.</li>
                  </ul>
                  <div className="uppercase mt-4">Free Quote Here</div>
                </div>
              </div>
              <div className="border-4 border-black p-4 flex-1">
                <div className="max-w-fit font-bold text-xl uppercase">
                  Detailed Disaster Plan
                </div>
                <div className="text-justify">
                  Evacuation routes specific to your home's
                  location.,Personalized gear recommendations.,Tips on securing
                  your home.,Communication plans for family members.
                  <ul className="list-disc ml-4">
                    <li>Evacuation routes specific to your home's location.</li>
                    <li>Personalized gear recommendations.</li>
                    <li>Tips on securing your home.</li>
                    <li>Communication plans for family members.</li>
                  </ul>
                  SIGN UP FOR FREE DETAILED RISK ASSESSMENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-pink-500 hidden text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        ref={checkButton}
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Please enter your email id
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex items-center">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email..."
                    className="p-2 border border-gray-300 rounded-md mx-5 w-full"
                    ref={email}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white py-3 px-6 font-bold uppercase rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (email.current.value.length !== 0) {
                        handleGenerateReport();
                      } else {
                        console.log("Please enter a valid email address");
                      }
                    }}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Footer />
    </>
  );
};

export default Dashboard;
