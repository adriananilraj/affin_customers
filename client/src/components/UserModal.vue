<template>
<!-- Modal -->
    <div class="modal fade" :id="type" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <slot name="title"></slot>
            <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body">
            <slot name="body"></slot>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default ({
    props: ['type'],
    data() {
        return {
        }
    }
})
</script>