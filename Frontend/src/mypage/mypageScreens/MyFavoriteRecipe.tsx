import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { address } from "../../project.config";
import { AppState } from "../../store";
import { NavigationHeader } from "../../theme";
import * as L from '../../store/login'
import { getMyFavoriteRecipeDatas, MyFavoriteRecipeProps } from "../data";
import { useEffect } from "react";
import MyFavoriteFlatlist from "../component/MyFavoriteFlatlist";

export const MyFavoriteRecipe = () => {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const [myData, setMyData] = useState<MyFavoriteRecipeProps[]>() 
    
    const {loggedIn, loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const datas = async() => {
        await getMyFavoriteRecipeDatas(loggedUser.memberId)
                .then(value => {
                    setMyData([value])
                    console.log("내가 좋아하는 레시피: " + JSON.stringify(value))
                    console.log(myData)
                })
    }
   useEffect(() => {
        datas()
        console.log("useEffect")
    }, []) 
    const test = () => {
        /* getMyFavoriteRecipeDatas(loggedUser.memberId)
                .then(value => {
                    console.log(JSON.stringify(value))
                }) */
        axios.get(address+"myFavoriteRecipe", { params: { memberId: "fff" } })
                .then((val) => {
                    console.log(val.data)
                })
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <NavigationHeader title="내가 즐겨보는 레시피" viewStyle={{}}
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
            <Button
                title="test"
                onPress={() => test()}
            />
            <View>
                <FlatList
                    data={myData}
                    renderItem={({item}) => (
                        <MyFavoriteFlatlist datas={item} />
                    )}
                    keyExtractor={(item) => item.memberId}
                />
            </View>
        </SafeAreaView>
    )
}

export default MyFavoriteRecipe

const styles = StyleSheet.create ({
    container: {
        flex:1
    }
})