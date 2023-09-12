import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import Home from "./layouts/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Login from "./layouts/Login";

export default function App() {
    const [staff, setStaff] = useState(null);
    const getStaff = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("staff");
            setStaff(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (e) {
            setStaff(null);
        }
    };

    useEffect(() => {
        getStaff();
    }, []);

    const Page = () => {
        return staff ? <Home /> : <Login setStaff={setStaff} />;
    };

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Page />
            <StatusBar style="auto" />
        </ApplicationProvider>
    );
}
