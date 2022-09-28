import Vue from 'vue'


Vue.directive('autofocus', {
    inserted: (el, binding) => {
        if (binding.value == true || binding.value == undefined) {
            el.focus()
        }
    }
});