export default {
  data () {
    return {
      categoriesList: []
    }
  },
  created () {
    this.loadCategoriesList()
  },
  methods: {
    async loadCategoriesList () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        }
      })
      console.log(res)
      this.categoriesList = res.data.data.result
    }
  }
}
