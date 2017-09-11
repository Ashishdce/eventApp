<template>
<div class="clearfix">
    <div class="col-xs-12">
        <div class="jumbotron">
            <h1 class="display-3">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
                <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
    </div>
</div>

</template>

<script>
    export default {
        name: 'home-component',
        data() {
            return {
                product: {}
            }
        }
    };
</script>

<style lang="scss" scoped>
    .jumbotron {
        background: rgba(255, 255, 255, 0.32);
        margin-top: 15px;
        color: #858585;
        a {
            background-color: #29abe1;
            border-color: #29abe1;
            &:hover {
                background-color: #5bc0de;
                border-color: #5bc0de;
            }
        }
    }
</style> 