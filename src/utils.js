import axios from "axios"
import { toPairs } from "lodash"
import { SOCIAL_NETWORKS } from "./constant"

export const doFetch = (options, success_logic, error_logic) => {
    axios({
        method: options.method,
        url: options.url,
        data: options.data
    }).then(response => success_logic(response))
    .catch(error => error_logic(error))
}

export const getTimeB10 = ({hours, minutes}) => {
    const time = hours + minutes / 60
    console.log(time.toFixed(2))
    return time.toFixed(2)
}


const INITIAL_DATA_PER_SN = SOCIAL_NETWORKS.reduce((acc, current) => ({...acc, [current]: 0}), {})

export const getTimePerSN = polls => () => {
    
    const sum_times = polls.reduce((acc, current) => {
        return {
           'facebook': acc.facebook + parseFloat(current.time_facebook_avg),
           'whatsapp': acc.whatsapp + parseFloat(current.time_whatsapp_avg),
           'twitter' : acc.twitter + parseFloat(current.time_twitter_avg),
           'instagram': acc.instagram + parseFloat(current.time_instagram_avg),
           'tiktok' : acc.tiktok + parseFloat(current.time_tiktok_avg),
        }
    }, INITIAL_DATA_PER_SN)

    return toPairs(sum_times).map((sn) => [sn[0], sn[1] / polls.length])
}

export const getVotesPerSN = polls => () => {
    const votes_sum = polls.reduce(
        (acc, current) => ({ 
            ...acc, 
            [current.favorite_social_network]: acc[current.favorite_social_network] + 1
        }),
        INITIAL_DATA_PER_SN)

        return toPairs(votes_sum)
}

export const getSNMLLoved = data => () => {
    
    const sn = data.reduce((acc, current) => {
        let mayor = null
        let minor = null

        if(acc) {
            if(current[1] > acc[0][1])
                mayor = current
            if(current[1] < acc[1][1])
                minor = current
        }else 
            return [current, current]

        return [
            mayor || acc[0],
            minor || acc[1]
        ]
    }, null)

    return sn
}