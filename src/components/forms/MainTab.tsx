import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfo from "./PersonalInfo"
import BillingInfo from "./BillingInfo"
import ConfirmPayment from "./ConfirmPayment"
import { useState } from "react"

function MainTab() {
    const [activeTab, setActiveTab] = useState()
    return (
        <Tabs defaultValue="personalInfo" className="relative flex-col space-y-12 items-center justify-between w-full">
            <TabsList className="flex gap-4 items-center justify-around w-full" > 
                <TabsTrigger value="personalInfo">Personal Info</TabsTrigger>
                <TabsTrigger value="billingInfo">Billing Info</TabsTrigger>
                <TabsTrigger value="confirmPayment">Confirm Payment</TabsTrigger>
            </TabsList>
            <span className="border-b border-black w-[95%] h-[1px] block absolute top-1 mx-2 "/>
            <TabsContent value="personalInfo">
                <PersonalInfo handleSubmit={() => console.log('wee')} />
            </TabsContent>
            <TabsContent value="billingInfo">
                <BillingInfo handleSubmit={() => console.log('wee')} />
            </TabsContent>
            <TabsContent value="confirmPayment">
                <ConfirmPayment/>
            </TabsContent>
        </Tabs>

    )
}

export default MainTab