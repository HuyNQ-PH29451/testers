import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import API from "../Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ setStaff }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const storeStaff = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("staff", jsonValue);
        } catch (e) {
            console.log("Error to store");
        }
    };

    const auth = (mail, pass) => {
        if (mail == "" || pass == "") {
            Alert.alert("Error!", "Please fill the information and try again!");
            return;
        }

        fetch(`${API}staffs?email=${mail}&password=${pass}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.length == 1) {
                    Alert.alert("Success!", "Login completed!");
                    setStaff(res[0]);
                    storeStaff(res[0]);
                } else {
                    Alert.alert("Error!", "Wrong email or password!");
                    return;
                }
            });
    };

    return (
        <Layout style={styles.container}>
            <Card style={{ width: "80%" }}>
                <Text
                    status="primary"
                    style={{ fontWeight: "bold", margin: 5 }}
                >
                    Please login to continue!
                </Text>
                <Input
                    style={{ marginVertical: 5 }}
                    placeholder="Email address"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />

                <Input
                    style={{ marginVertical: 5 }}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={(e) => setPassword(e)}
                />

                <Button
                    style={{ marginVertical: 5 }}
                    onPress={() => auth(email, password)}
                >
                    Log In
                </Button>
            </Card>
        </Layout>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
