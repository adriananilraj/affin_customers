<template>
  <section class="row justify-content-center gap-3">
    <!-- <div class="col-12">
      <div class="card">
        <div class="card_title">Filter Customers</div>

        <div class="row">
          <div class="col-md-4 col-sm-12">
            <label for="">ID</label>
            <input type="text" placeholder="Enter an ID">
          </div>
          <div class="col-md-4 col-sm-12">
            <label for="">Name</label>
            <input type="text" placeholder="Enter Name...">
          </div>
        </div>
      </div>
    </div> -->
    <div class="col-12 ">
      <div class="card">
        <div class="d-flex justify-content-between">
          <div class="card_title">Customers Listings</div>
          <button type="button"  class="btn btn-outline-secondary btn-sm"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Customer</button>
        </div>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Customers ID</th>
                <th>Customers Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="data.customers.length > 0 && data.customers.length">
              <tr v-for="(c,i) in data.customers" :key="i">
                <td>{{ c.customer_id }}</td>
                <td>{{ `${c.first_name} ${c.last_name}` }}</td>
                <td>{{ c.email}}</td>
                <td>{{ c.phone}}</td>
                <td>
                  <div class="d-flex align-items-center gap-2 action-icon btn-group-sm">
                    <img src="./assets/svg/edit.svg"  type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="getCustomerDetails(c)">
                    <img src="./assets/svg/trash.svg" type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteUser" @click="getCustomerID(c)">
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr >
                <td colspan="100">{{ 'No Data Available' }}</td>
              </tr>
            </tbody>
          </table>

          <!-- <Pagination
          :current-page="data.pagination.currentPage"
          :total-pages="totalPages"
          @update:current-page="data.pagination.currentPage = $event"
          /> -->
        </div>
      </div>


      <UserModal title="Add Customer" :type="'staticBackdrop'"> 
        <template v-slot:title>
          Add Customers
        </template>
        <template v-slot:body>
          <div>
              <Form @submit="onSubmit">
                  <div class="form-group">
                      <label>First Name</label>
                      <Field name="first_name" type="text" v-model="form.first_name" :rules="isRequired" placeholder="Name"/>
                      <ErrorMessage class="text-danger font-xs" name="first_name" />
                  </div>
                  <div class="form-group">
                      <label>Last Name</label>
                      <Field name="last_name" type="text" v-model="form.last_name" :rules="isRequired" placeholder="Name"/>
                      <ErrorMessage class="text-danger font-xs" name="last_name" />
                  </div>
                  <div class="form-group">
                      <label>Email</label>
                      <Field name="email" type="email" v-model="form.email" :rules="validateEmail" placeholder="Email"/>
                      <ErrorMessage class="text-danger font-xs" name="email" />
                  </div>
                  <div class="form-group">
                      <label>Phone</label>
                      <Field name="phone" type="phone" v-model="form.phone" :rules="isRequired" placeholder="Phone"/>
                      <ErrorMessage class="text-danger font-xs" name="phone" />
                  </div>
                  <div class="d-flex gap-2 justify-content-end">
                    <button type="submit" :disabled="submitting"  class="btn btn-success">
                    <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Submit
                    </button>
                    <button type="button" class="btn btn-secondary" id="closeBtn" data-bs-dismiss="modal" @click="clearForm">Close</button>
                  </div>
                </form>
              </div>
        </template>
      </UserModal>

      <DeleteModal title="Delete Customer?" v-if="customer" v-show="customer"> 
        <template v-slot:delete-body>
          {{ `Are you sure you want to delete Customer ID: ${customer.customer_id}` }}
        </template>
        <template v-slot:delete-footer>
          <button type="button" class="btn btn-secondary" id="closeDeleteBtn" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" @click="removeCustomer">Yes, Delete</button>
        </template>
      </DeleteModal>

      <UserModal title="Edit Customer" :type="'editUserModal'"> 
        <template v-slot:title>
          Edit Customers
        </template>
        <template v-slot:body>
          <div>
              <Form @submit="updateCustomer">
                  <div class="form-group">
                      <label>First Name</label>
                      <Field name="first_name" type="text" v-model="customer.first_name" :rules="isRequired" placeholder="Name"/>
                      <ErrorMessage class="text-danger font-xs" name="first_name" />
                  </div>
                  <div class="form-group">
                      <label>Last Name</label>
                      <Field name="last_name" type="text" v-model="customer.last_name" :rules="isRequired" placeholder="Name"/>
                      <ErrorMessage class="text-danger font-xs" name="last_name" />
                  </div>
                  <div class="form-group">
                      <label>Email</label>
                      <Field name="email" type="email" v-model="customer.email" :rules="validateEmail" placeholder="Email"/>
                      <ErrorMessage class="text-danger font-xs" name="email" />
                  </div>
                  <div class="form-group">
                      <label>Phone</label>
                      <Field name="phone" type="phone" v-model="customer.phone" :rules="isRequired" placeholder="Phone"/>
                      <ErrorMessage class="text-danger font-xs" name="phone" />
                  </div>
                  <div class="d-flex gap-2 justify-content-end">
                    <button type="submit" :disabled="submitting"  class="btn btn-success">
                    <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Submit
                    </button>
                    <button type="button" class="btn btn-secondary" id="closeEditBtn" data-bs-dismiss="modal" @click="clearForm">Close</button>
                  </div>
                </form>
              </div>
        </template>
      </UserModal>
    </div>
  </section>

</template>

<script>
import Pagination from './components/Pagination.vue';
import UserModal from './components/UserModal.vue';
import DeleteModal from './components/DeleteModal.vue';
import axios from 'axios';
import { Form, Field, ErrorMessage, } from 'vee-validate';
export default ({
  components: {
    Pagination,
    UserModal,
    DeleteModal,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: {
        customers: [],
        pagination: {
          currentPage: 1,
          itemsPerPage: 1,
        }
      },
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      },
      submitting: false,
      customer: {},
    }
  },
  computed: {
    // Compute total number of pages based on data and items per page
    totalPages() {
      return Math.ceil(this.data.customers.length / this.data.pagination.itemsPerPage);
    },
    // Slice data to only show items for current page
    visibleData() {
      const startIndex = (this.data.pagination.currentPage - 1) * this.data.pagination.itemsPerPage;
      const endIndex = startIndex + this.data.pagination.itemsPerPage;
      return this.data.slice(startIndex, endIndex);
    }
  },
  methods: {
    onSubmit(values) {
      axios.post('http://localhost:3000/customers', {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        email: values.email
      }).then(res => {
        console.log(res)
        if (res.status == 201) {
          document.getElementById("closeBtn").click();
          this.getCustomerList();
          this.clearForm();
        }
        // console.log('Server Response:', res)
      }).catch(error => {
        console.error('Error Sending POST Request', error);
      })
      // this.submitting = true;
      // setTimeout(() => {
      //   this.submitting = false
      // }, 1000);
    },
    updateCustomer(values) {
      axios.put(`http://localhost:3000/customers/${this.customer.customer_id}`, {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        email: values.email
      }).then(res => {
          document.getElementById("closeEditBtn").click();
          this.getCustomerList();
          this.clearForm();
          console.log('Server Response:', res)
      }).catch(error => {
        console.error('Error Sending POST Request', error);
      })
    },
    getCustomerList() {
      axios.get('http://localhost:3000/customers-list').then(res => {this.data.customers = res.data}).catch(error => {console.error('Error Retrieving GET Request', error)});
    },
    getCustomerID(data) {
      this.customer = data;
    },
    removeCustomer() {
      axios.delete(`http://localhost:3000/customers/${this.customer.customer_id}`)
      .then(res => {
        console.log(res.data);
        document.getElementById("closeDeleteBtn").click();
        this.getCustomerList();
        this.customer = {};
      }).catch(error => {
        console.error('Error Deleting', error);
      })
    },  
    clearForm() {
      this.form = {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    },
    validatePhone(value) {
      // console.log(value);
      // if (!value) {
      //   return 'This field is required'
      // }

      //If phone doesn't match Malaysian Number
      // const regex = /^01[0-46-9]-*[0-9]{7,8}$/;
      // if (regex.test(value)) {
      //   return 'This field must match Malaysian Number'
      // }
    },
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'This is required';
    },
    getCustomerDetails(data) {
      this.customer = data;
    }
  },
  mounted() {
    this.getCustomerList();
  }
})
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card_title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.card label {
  margin-bottom: 5px;
}

.card input {
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  outline: none;
  box-shadow: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card input:hover {
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  outline: none;
  box-shadow: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card__button {
  background-color: #4299e1;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.card__button:hover {
  background-color: #2b6cb0;
}


.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
}

.table td,
.table th {
  padding: .75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}


.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #333;
}

.form-group input:focus {
  outline: none;
  box-shadow: 0 0 5px #999;
}

.action-icon img {
  cursor: pointer;
}

.font-xs {
  font-size: 12px;
}

@media (max-width: 767px) {
  .table td,
  .table th {
    padding: .3rem;
  }
  
  .table thead {
    display: none;
  }
  
  .table tbody {
    display: block;
  }
  
  .table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border-bottom: 2px solid #dee2e6;
  }
  
  .table tbody td:before {
    display: block;
    font-weight: bold;
    margin-bottom: .5rem;
    content: attr(data-th);
  }
  
  .table tbody td {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  
  .table tbody td:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    padding-right: 1rem;
    white-space: nowrap;
  }
}


</style>
