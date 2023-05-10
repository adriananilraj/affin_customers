<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="deleteUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Remove Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <slot name="delete-body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="delete-footer"></slot>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>