<template>
    <div class="row justify-content-center my-5">
        <div class="col">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <!-- Title -->
                        <div class="mb-3">
                            <label for="post-title" class="form-label">
                                Title
                            </label>
                            <div class="form-outline w-25">
                                <input v-model="role.name" id="post-title" type="text" class="form-control">
                            </div>
                            <div class="text-danger mt-1">
                                {{ errors.name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <DualListBox
                            leftLabel="Available Permissions"
                            rightLabel="Current Permissions"
                            :leftData="availablePermissions"
                            :rightData="currentPermissions"
                            v-on:onChangeList="onChangeList"
                        ></DualListBox>
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script async setup>
import {isProxy, isRef, unref, onBeforeMount, onMounted, reactive, toRaw, toRefs, watchEffect, ref, markRaw} from "vue";
import {useRoute} from "vue-router";
import useRoles from "@/composables/roles";
import {useForm, useField, defineRule} from "vee-validate";
import {required, min} from "@/validation/rules"
import DualListBox from "../../../components/DualListBox.vue";
import usePermissions from "@/composables/permissions";


defineRule('required', required)
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3'
}
// Create a form context with the validation schema
const {validate, errors, resetForm} = useForm({validationSchema: schema})
// Define actual fields for validation
const {value: name} = useField('name', null, {initialValue: ''});
const {
    role: postData,
    updateRolePermissions,
    getRole,
    updateRole,
    validationErrors,
    isLoading
} = useRoles()
// const {allPermission, getAllPermissions} = usePermissions()
const role = reactive({
    name
})
const route = useRoute()

let response = await axios.get('/api/permissions/')
let allPermission = response.data.data;

response = await axios.get('/api/role-permissions/' + route.params.id)
let rolePermissionList = response.data.data;

let diffPermission = getDifference(allPermission, rolePermissionList);

let availablePermissions = ref(diffPermission)
let currentPermissions = ref(rolePermissionList)


function submitForm() {
    validate().then(form => {
        if (form.valid) {
            let permissions = currentPermissions.value.map(a => a.id);
            updateRolePermissions(role, permissions)
            //  updateRole(role)
        }
    })
}

function onChangeList(data) {
    //console.log(data)
}

onMounted(() => {
    getRole(route.params.id)
})
// https://vuejs.org/api/reactivity-core.html#watcheffect
watchEffect(() => {
    role.id = postData.value.id
    role.name = postData.value.name
})


function getDifference(array1, array2) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.id === object2.id;
        });
    });
}
</script>
