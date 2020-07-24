<template>
    <li class="user-profile nav-item">
  <div class="dropdown" @click="toggleDropdown">
    <img src="@/assets/logo.png" alt="user-alias">
    <ul class="dropdown-menu" v-if="showDropdown">
      <li class="dropdown-menu-item"><a>Dashbord</a></li>
      <li class="dropdown-menu-item"><a>Profile</a></li>
      <li class="dropdown-menu-item"><a>Settings</a></li>
      <li class="dropdown-menu-item"><a>Logout</a></li>
    </ul>
  </div>
</li>
</template>

<script>
    export default {
  data () {
    return {
      showDropdown: false,
    }
  },
  methods: {
    toggleDropdown (e) {
      e.stopPropagation() // this will stop propagation of this event to upper level
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        window.addEventListener('click', () => {
          this.showDropdown = false
        })
      } else {
        window.removeEventListener('click', () => {
          this.showDropdown = false
        })
      }
    }
  }
}
</script>