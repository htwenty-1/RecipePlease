import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../../theme";

export default function MyFavoriteRecipe() {

    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])

    return (
        <SafeAreaView style={[styles.container]}>
            <NavigationHeader title="내가 즐겨보는 레시피" viewStyle={{}}
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex:1
    }
})