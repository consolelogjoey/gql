<template>
  <div>
    <div class="d-flex justify-end mb-4">
      <v-btn @click="popupCreate" color="primary">
        <v-icon>mdi-pencil-plus-outline</v-icon>
        create member
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-icon @click="showDialog(item)" class="mr-4">mdi-pencil</v-icon>
        <v-icon>mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="edit.name"
                  label="Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="edit.email"
                  label="Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="edit.tel"
                  label="Tel"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="edit.class"
                  label="Class"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="departments"
                  item-text="name"
                  item-value="id"
                  v-model="edit.department_id"
                  label="Department"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="majors"
                  item-text="name"
                  item-value="id"
                  v-model="edit.major_id"
                  label="Major"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="edit.status"
                  label="Status"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" depressed @click="updateData">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCreate" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="tel" label="Tel" outlined></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="insertClass"
                  label="Class"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="departments"
                  item-text="name"
                  item-value="id"
                  v-model="department_id"
                  label="Department"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="majors"
                  item-text="name"
                  item-value="id"
                  v-model="major_id"
                  label="Major"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="status"
                  label="Status"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" depressed @click="createMember">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import updateMember from '~/gql/mutations/updateMembers.gql'
import insertMember from '~/gql/mutations/insertMember.gql'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      data: [],
      departments: [],
      majors: [],
      name: '',
      email: '',
      tel: '',
      insertClass: '',
      status: '',
      department_id: '',
      major_id: '',
      edit: [
        {
          name: '',
          email: '',
          tel: '',
          class: '',

          status: '',
        },
      ],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Tel',
          value: 'tel',
        },
        {
          text: 'Class',
          value: 'class',
        },
        {
          text: 'Department',
          value: 'department.name',
        },
        {
          text: 'Major',
          value: 'major.name',
        },
        {
          text: 'Status',
          value: 'status',
        },
        {
          text: 'Action',
          value: 'action',
        },
      ],
      dialog: false,
      dialogCreate: false,
    }
  },
  methods: {
    getMember() {
      this.$apollo
        .query({
          fetchPolicy: 'no-cache',
          query: require('~/gql/queries/getMembers.gql').getMembers,
        })
        .then((res) => {
          this.data = res.data?.members
          this.data.forEach((item) => {
            item.department_name = item.department.name
            item.major_name = item.major.name
          })

          console.log('🚀 ~ file: index.vue:20 ~ .then ~ this.data:', this.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDepartment() {
      this.$apollo
        .query({
          query: require('~/gql/queries/getDepartment.gql').getDepartment,
        })
        .then((res) => {
          this.departments = res.data?.department
          console.log(
            '🚀 ~ file: index.vue:168 ~ .then ~ this.departments:',
            this.departments
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMajor() {
      this.$apollo
        .query({
          query: require('~/gql/queries/getMajor.gql').getMajor,
        })
        .then((res) => {
          this.majors = res.data?.major
          console.log(
            '🚀 ~ file: index.vue:182 ~ .then ~ this.majors:',
            this.majors
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showDialog(data) {
      this.dialog = true
      this.edit = data
      console.log(
        '🚀 ~ file: index.vue:203 ~ showDialog ~   this.edit:',
        this.edit
      )
    },
    updateData() {
      // const d = {
      //     id: this.edit.id,
      //     name: this.edit.name,
      //     email: this.edit.email,
      //     tel: this.edit.tel,
      //     class: this.edit.class,
      //     status: this.edit.status,
      //     department_id: this.edit.department_id,
      //     major_id: this.edit.major_id,
      // }
      // console.log('🚀 ~ file: index.vue:224 ~ updateData ~ d:', d)
      this.$apollo
        .mutate({
          mutation: gql`
            ${updateMember.updateMembers}
          `,
          variables: {
            id: this.edit.id,
            name: this.edit.name,
            email: this.edit.email,
            tel: this.edit.tel,
            class: this.edit.class,
            status: this.edit.status,
            department_id: this.edit.department_id,
            major_id: this.edit.major_id,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Update Success',
            showConfirmButton: false,
            timer: 1500,
          })
          this.dialog = false
          this.getMember()
          console.log('res :>> ', res)
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.vue:227 ~ updateData ~ err:', err)
        })
    },
    popupCreate() {
      this.dialogCreate = true
    },
    createMember() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insertMember.insertMember}
          `,
          variables: {
            name: this.name,
            email: this.email,
            tel: this.tel,
            class: this.insertClass,
            status: this.status,
            department_id: this.department_id,
            major_id: this.major_id,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Insert Success',
            showConfirmButton: false,
            timer: 1500,
          })
          this.dialogCreate = false
          this.getMember()
          console.log('res :>> ', res)
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.vue:227 ~ updateData ~ err:', err)
        })
    },
  },
  mounted() {
    this.getMember()
    this.getDepartment()
    this.getMajor()
  },
}
</script>

<style>
</style>