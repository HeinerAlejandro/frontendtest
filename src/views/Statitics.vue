<template>
    <ContainerNumber 
        :content="countPollsFilled"
        title = "Filled Polls"
    />

    <LayoutStatitics v-if="testDataTimePerSN">
        <template #first_panel>
            <ContainerNumber
                v-if="snMLUsed"
                :content="CMostTimeSN" 
                title="Most Used Social Network"
            >
               <template #icon><LikeTwoTone class="chart-icon" two-tone-color="#00ba19" /></template> 
            </ContainerNumber>
        </template>
        <template #second_panel>
            <ContainerNumber
                v-if="snMLUsed"
                :content="CLeastTimeSN" 
                title="Least Used Social Network"
            >
                <template #icon><DislikeTwoTone class="chart-icon" two-tone-color="#ee0000" /></template>
            </ContainerNumber>
        </template>
        <template #third_panel>
            <ContainerGraph
                title="Average Time Per Social Network"
            >
                <column-chart
                    :data='testDataTimePerSN'
                    :colors="colors"
                    :suffix='suffix_hour'
                    :ytitle='yhour_title'
                    :xtitle='xsn_title'
                />
            </ContainerGraph>
        </template>
    </LayoutStatitics>
  
    <LayoutStatitics v-if="testDataVotePerSN">
        <template #first_panel>
            <ContainerNumber
                v-if="snMLLoved"
                :content="CMostLoveSN" 
                title="Most Loved Social Network"
            >
                <template #icon><LikeTwoTone class="chart-icon" two-tone-color="#00ba19" /></template>
            </ContainerNumber>
        </template>
        <template #second_panel>
            <ContainerNumber
                v-if="snMLLoved"
                :content="CLeastVoteSN" 
                title="Least Loved Social Network"
            >
                <template #icon><DislikeTwoTone class="chart-icon" two-tone-color="#ee0000" /></template>
            </ContainerNumber>
        </template>
        <template #third_panel>
            <ContainerGraph
                title="Votes Per Social Network"
            >
                <column-chart
                    :data='testDataVotePerSN'
                    :colors='colors'
                    suffix=' Votes'
                    ytitle='Votes'
                    xtitle='Social Networks'
                />
            </ContainerGraph>
        </template>
    </LayoutStatitics>
    <h3 class="ml-2 mt-2 bold">SOCIAL NETWORKS MOST USED PER AGE RANGE</h3>
    <a-row>
        <ExtractorDataUrl :url="url_sm_used_per_age" >
            <template v-slot="child">
                <a-col 
                    class="mt-1"
                    :lg="{ span: 4 }"
                    :md="{ span: 12 }"
                    :xs="{ span: 24 }"
                    v-for="(value, key) of child.data"
                    :key="key"
                >
                    <ContainerNumber 
                        :title="key"
                        :content="value"
                    >
                        <template #icon><SmileTwoTone class="chart-icon" two-tone-color="#ffb600" /></template>
                    </ContainerNumber>
                </a-col>
            </template>
        </ExtractorDataUrl>
    </a-row>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

import { LikeTwoTone, DislikeTwoTone, SmileTwoTone } from '@ant-design/icons-vue'
import { doFetch, getSNMLLoved, getTimePerSN, getVotesPerSN } from '../utils'
import { POLL_SN_PER_AGE_URL, POLL_URL } from '../constant'

import LayoutStatitics from '../components/LayoutStatitics.vue'
import ContainerNumber from '../components/ContainerNumber.vue'
import ContainerGraph from '../components/ContainerGraph.vue'
import ExtractorDataUrl from '../components/ExtractorDataFromUrl.vue'

export default {
    name: 'Statitics',
    components: {
        LayoutStatitics,
        ContainerNumber,
        ContainerGraph,
        ExtractorDataUrl,
        LikeTwoTone,
        DislikeTwoTone,
        SmileTwoTone
    },
    setup() {

        const colors = ref(['#3b5998', '#25D366', '#00acee', '#833ab4', '#000'])

        const polls = ref([])
        const loading = ref(null)
        const error = ref(null)
        const suffix_hour = ref(" Hours")
        const yhour_title = ref("Hours")
        const xsn_title = ref("Social Networks")

        const testDataTimePerSN = ref(null)
        const testDataVotePerSN = ref(null)

        const snMLUsed = ref(null)
        const snMLLoved = ref(null)

        const CMostTimeSN = ref(null)
        const CLeastTimeSN = ref(null)
        
        const CMostLoveSN = ref(null)
        const CLeastVoteSN = ref(null)

        const mostUsedPerAge = ref(null)
        
        const url_sm_used_per_age = ref(POLL_SN_PER_AGE_URL)

        const success_logic = response => {
            polls.value = response.data

            testDataTimePerSN.value = getTimePerSN(polls.value)()
            snMLUsed.value = getSNMLLoved(testDataTimePerSN.value)()
            CMostTimeSN.value = `${snMLUsed.value[0][0]}: ${snMLUsed.value[0][1]}`
            CLeastTimeSN.value = `${snMLUsed.value[1][0]}: ${snMLUsed.value[1][1]}`

            testDataVotePerSN.value = getVotesPerSN(polls.value)()
            snMLLoved.value = getSNMLLoved(testDataVotePerSN.value)()
        
            CMostLoveSN.value = `${snMLLoved.value[0][0]}: ${snMLLoved.value[0][1]}`
            CLeastVoteSN.value = `${snMLLoved.value[1][0]}: ${snMLLoved.value[1][1]}`
        }

        const error_logic = err => {
            error.value = err
            loading.value = false
        }

        const options = {
            url: POLL_URL,
            method: 'get',
            data: {}
        }

        onMounted(() => {
            doFetch(options, success_logic, error_logic)
            doFetch(
                {...options, url: POLL_SN_PER_AGE_URL},
                response => mostUsedPerAge.value = response.data,
                err => console.log(err)
            )
        })

        const countPollsFilled = computed(() => polls.value.length)
        
        return {
            colors,
            polls,
            loading,
            error,
            suffix_hour,
            xsn_title,
            yhour_title,
            countPollsFilled,
            testDataTimePerSN,
            testDataVotePerSN,
            snMLUsed,
            snMLLoved,
            CMostTimeSN,
            CLeastTimeSN,
            CMostLoveSN,
            CLeastVoteSN,
            mostUsedPerAge,
            url_sm_used_per_age
        }
    }
}
</script>

<style>
    .mt-1 {
        margin-top: 1rem;
    }

    .ml-2 {
        margin-left: 1rem;
    }

    .mt-2 {
        margin-top: 2rem;
    }

    .bold {
        font-weight: bold;
    }
</style>