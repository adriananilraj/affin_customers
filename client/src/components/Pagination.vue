<template>
    <div class="pagination">
      <button class="prev" @click="prevPage" :disabled="currentPage === 1">
        Prev
      </button>
      <span class="page-num">{{ currentPage }}</span>
      <button class="next" @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      prevPage() {
        this.$emit('update:currentPage', this.currentPage - 1);
        window.scrollTo(0, 0); // Scroll to top of page
      },
      nextPage() {
        this.$emit('update:currentPage', this.currentPage + 1);
        window.scrollTo(0, 0); // Scroll to top of page
      }
    }
  };
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  
  .prev,
  .next {
    background: #ddd;
    border: none;
    color: #333;
    font-size: 16px;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .prev:disabled,
  .next:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-num {
    margin: 0 10px;
    font-size: 18px;
  }
  </style>
  