import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { beautifyObjectName } from "../wrappers/autoform/utils";
import PersonalInfo from "./PersonalInfo";
import BillingInfo from "./BillingInfo";
import ConfirmPayment from "./ConfirmPayment";
import { useState, useRef } from "react";
import { Button } from "../ui/button";

function MainTab() {
  const formArray = [
    {
      id: "personalInfo",
      name: "Fill in your Details",
      component: PersonalInfo,

      // <PersonalInfo
      //   ref={formRef}
      //   formSchema={personalInfoSchema}
      //   handleSubmit={handleSubmit}
      // />
    },
    {
      id: "billingInfo",
      name: "Enter your Payment Information",
      component: BillingInfo,
    },
    {
      id: "confirmPayment",
      name: "Review your purchase",
      component: ConfirmPayment,
    },
  ];

  const componentRefs = useRef<HTMLButtonElement[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [formValid, setFormValidity] = useState(false);
  const [filledForms, setFilledForms] = useState<string[]>([]);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    console.log(formValid, filledForms);
    if (formValid) {
      if (activeTab < formArray.length - 1) {
        setActiveTab(activeTab + 1);
        setFilledForms([...filledForms, formArray[activeTab].id]);
        setFormValidity(false);
      }
    }
  };
  const handleSubmit = (data: any) => {
    const [isFormValid, userData] = data;
    setFormValidity(() => isFormValid);
    console.log(formValid, userData);
    if (userData) {
      const formattedData = JSON.stringify(userData);
      console.log(formattedData);
      setFormData({ ...formData, formattedData });
      handleNext();
    }
  };

  const handleBack = (e: MouseEvent) => {
    e.preventDefault();
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <>
      <Tabs
        value={formArray[activeTab].id}
        defaultValue={formArray[activeTab].id}
        className="relative flex-col space-y-12 items-center justify-between w-full"
      >
        <TabsList className="flex gap-4 items-center justify-around w-full">
          {formArray.map((form, id) => {
            return (
              <TabsTrigger
                key={form.id}
                value={form.id}
                onClick={() => {
                  if (filledForms.includes(form.id)) {
                    setActiveTab(id);
                  }
                }}
              >
                {beautifyObjectName(form.id)}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <span className="border-b border-black w-[95%] h-[1px] block absolute top-1 mx-2 " />
        {formArray.map((form, index) => {
          return (
            <TabsContent value={form.id}>
              {
                <form.component
                  key={form.id + form.name}
                  handleSubmit={handleSubmit}
                  ref={(component) =>
                    (componentRefs.current[index] = component!)
                  }
                />
              }
            </TabsContent>
          );
        })}
      </Tabs>
      {activeTab !== formArray.length - 1 && (
        <div className="flex">
          <Button
            className="px-8"
            type="submit"
            onClick={(e) => {
              console.log(componentRefs, activeTab);
              componentRefs.current[activeTab]?.click();
            }}
          >
            {"Next"}
          </Button>
          <Button
            variant="ghost"
            className="text-[#4E598C] text-md font-medium"
          >
            Cancel Payment
          </Button>
        </div>
      )}
    </>
  );
}

export default MainTab;
