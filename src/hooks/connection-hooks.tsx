import { useNetInfo } from '@react-native-community/netinfo';

export function useConnectionInfo() {
    const netInfo = useNetInfo();


    async function checkConnection(){
        if (!netInfo.isConnected) {
            //do something
            console.log("No internet connection");
        }
        return netInfo.isConnected
    }

    return checkConnection
}
