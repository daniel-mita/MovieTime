import { useNetInfo } from '@react-native-community/netinfo';

export function useConnectionInfo() {
    const netInfo = useNetInfo();


    async function checkConnection(){
        if (!netInfo.isConnected) {
            //do something
        }
        return netInfo.isConnected
    }

    return checkConnection
}
