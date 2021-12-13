<template>
    <a-form
        name="poll_form"
        :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }"
        hasFeedback 
        @submit="handleSubmit"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
    >
        <a-form-item 
            has-feedback 
            label="Email" 
            name="email"
            v-bind="validateInfos.email"
        >
            <a-input
                placeholder="Type you email"
                v-model:value="formState.email" 
                type="email" 
            />
        </a-form-item>

        <a-form-item 
            has-feedback 
            label="Age" 
            name="age"
            v-bind="validateInfos.age"
        >
            <a-select v-model:value="formState.age" placeholder="select your age range">
                <a-select-option v-for="age of ages" :value="age" :key="age">{{ age }}</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item 
            has-feedback 
            label="Gender" 
            name="gender"
            v-bind="validateInfos.gender"
        >
            <a-select v-model:value="formState.gender" placeholder="Select your Gender:">
                <a-select-option v-for="gender of genders" :value="gender" :key="gender">{{ gender }}</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item 
            has-feedback 
            label="Favorite SocialNetwork" 
            name="favorite_social_network"
            v-bind="validateInfos.favorite_social_network"
        >
            <a-select v-model:value="formState.favorite_social_network" placeholder="Select your Favorite Socialnetwork:">
                <a-select-option v-for="social of socials" :value="social" :key="social">{{ social }}</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item label="Time in Facebook(Horas/Minutes)">
            <a-form-item  :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number placeholder="Hours" v-model:value="formState.time_facebook_avg.hours" :min="0" :max="23" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"> : </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number default-value="" placeholder="Minutes" v-model:value="formState.time_facebook_avg.minutes" :min="0" :max="59" />
            </a-form-item>
        </a-form-item>

        <a-form-item label="Time in Whatsapp(Horas/Minutes)">
            <a-form-item  :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number placeholder="Hours" v-model:value="formState.time_whatsapp_avg.hours" :min="0" :max="23" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"> : </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number default-value="" placeholder="Minutes" v-model:value="formState.time_whatsapp_avg.minutes" :min="0" :max="59" />
            </a-form-item>
        </a-form-item>
        
        <a-form-item label="Time in Twitter(Horas/Minutes)">
            <a-form-item  :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number placeholder="Hours" v-model:value="formState.time_twitter_avg.hours" :min="0" :max="23" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"> : </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number default-value="" placeholder="Minutes" v-model:value="formState.time_twitter_avg.minutes" :min="0" :max="59" />
            </a-form-item>
        </a-form-item>

        <a-form-item label="Time in Instagram(Horas/Minutes)">
            <a-form-item  :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number placeholder="Hours" v-model:value="formState.time_instagram_avg.hours" :min="0" :max="23" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"> : </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number default-value="" placeholder="Minutes" v-model:value="formState.time_instagram_avg.minutes" :min="0" :max="59" />
            </a-form-item>
        </a-form-item>
        
        <a-form-item label="Time in TikTok(Horas/Minutes)">
            <a-form-item  :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number placeholder="Hours" v-model:value="formState.time_tiktok_avg.hours" :min="0" :max="23" />
            </a-form-item>
            <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"> : </span>
            <a-form-item :style="{ display: 'inline-block', width: 'calc(15% - 12px)' }">
                <a-input-number default-value="" placeholder="Minutes" v-model:value="formState.time_tiktok_avg.minutes" :min="0" :max="59" />
            </a-form-item>
        </a-form-item>
        
        <a-form-item :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 11 },
      }">
            <a-button type="primary" htmlType="submit">Create</a-button>
        </a-form-item>
    </a-form>
</template>

<script>

import { reactive } from 'vue'

import { Form } from 'ant-design-vue'
import { message } from 'ant-design-vue'

import { 
    AGE_RANGES,
    GENDERS,
    POLL_URL,
    SOCIAL_NETWORKS
} from '../constant'

import { doFetch, getTimeB10 } from '../utils'

const useForm = Form.useForm;

export default {
    name: 'PollForm',
    setup() {
      
        const formState = reactive({
            email: "",
            age: "",
            gender: "",
            favorite_social_network: "",
            time_facebook_avg: {
                hours: 0,
                minutes: 0
            },
            time_whatsapp_avg: {
                hours: 0,
                minutes: 0
            },
            time_twitter_avg: {
                hours: 0,
                minutes: 0
            },
            time_instagram_avg: {
                hours: 0,
                minutes: 0
            },
            time_tiktok_avg: {
                hours: 0,
                minutes: 0
            }, 
        })

        const rulesRef = reactive({
            email: [
                {
                    required: true,
                    message: "Please Input a Email Valid"
                }  
            ],
            age: [
                {
                    required: true,
                    message: "Please Select an age range option"
                }
            ],
            gender: [
                {
                    required: true,
                    message: "Please Select a gender option"
                }
            ],
            favorite_social_network: [
                {
                    required: true,
                    message: "Please Select your Favorite Social Network"
                }
            ],
        })

        const { validate, validateInfos } = useForm(formState, rulesRef, {
            onValidate: (...args) => console.log(...args)
        })

        let options = {
            url: POLL_URL,
            method: 'post'
        }
        
        const success_logic = () => {
            message.success(`Your poll was registered successfully`)
        } 

        const error_logic = error => {
            for(let value of Object.values(error.response.data))
                message.error(value)
        }

        const handleSubmit = () => {
            validate()
                .then(() => {
                    options = {
                        ...options, 
                        data: {
                            ...formState,
                            time_facebook_avg: getTimeB10(formState.time_facebook_avg),
                            time_whatsapp_avg: getTimeB10(formState.time_whatsapp_avg),
                            time_twitter_avg: getTimeB10(formState.time_twitter_avg),
                            time_instagram_avg: getTimeB10(formState.time_instagram_avg),
                            time_tiktok_avg: getTimeB10(formState.time_tiktok_avg),  
                        }
                    } 
                    doFetch(options, success_logic, error_logic)
                })
                .catch((err) => console.log(err) )
        }
        
        const handleFinish = values => {
            console.log(`After finish ${values}`)
        }

        const handleFinishFailed = errors => {
            console.log(errors)
        }

        return {
            formState,
            handleSubmit,
            validateInfos,
            handleFinishFailed,
            handleFinish
        };
    },
    data() {
        return {
            ages : AGE_RANGES,
            genders: GENDERS,
            socials: SOCIAL_NETWORKS,
        }
    }
}
</script>