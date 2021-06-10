const skills = [
    'UI / UX',
    'Front End',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node',
    'Redis',
    'MongoDB',    
    'Python',
    'C#',
    'Ruby',
    'Back End',
];
const app = Vue.createApp({
  data(){
    return {
      loading: false,
      rotation: 'none',
      copyState: false,
      user: {
        firstName: 'John',
        lastName : 'Doe',
        email: 'john.doe@example.com',
        gender: 'female',
        picture: 'https://randomuser.me/api/portraits/men/3.jpg',
        city: 'Istanbul',
        country: 'Turkey',
        skills: this.getRandomSkills(),
      }
    }
  },
  methods: {
    getKeyValue(items, path){
      let item = items[0];
      path.split('.').map((key) => {
        if(item[key] !== undefined && item[key] !== null) item = item[key]
      }) 
      return item;
    },
    getRandomSkills() {
      // Get sub-array of first n elements after shuffled
      return skills.sort(() => .5 - Math.random()).slice(0,4)
    },
    async getUser(){
      this.rotation = 'spin';
      this.loading = true;

      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();
      
      this.user = {
        firstName: this.getKeyValue(results, 'name.first'),
        lastName: this.getKeyValue(results, 'name.last'),
        email: this.getKeyValue(results, 'email'),
        gender: this.getKeyValue(results, 'gender'),
        picture: this.getKeyValue(results, 'picture.large'),
        city: this.getKeyValue(results, 'location.city'),
        country: this.getKeyValue(results, 'location.country'),
        skills: this.getRandomSkills()
      }
      this.getKeyValue(results, 'location.country'),
      this.loading = false;
      this.rotation = 'none';
    },
    createAlertEl(content = '') {
      const el = document.createElement('span');
      // el.classList.add('alert');
      // el.setAttribute("active", 'true');
      // el.value = content;
      document.body.prepend(el);
      this.alertEl = el;
     
      // setTimeout(() => {
      //   document.body.removeChild(el);
      // }, 3000);
    },
    copyToClipboard(value) {
      const el = document.createElement('textarea');
      const stringfied = JSON.stringify(value, null, 2);
      const unquoted = stringfied.replace(/"([^"]+)":/g, '$1:');
      el.value = unquoted;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');                  
      document.body.removeChild(el);
      this.copyState = true;
      setTimeout(()=>{
        this.copyState = false;
      }, 1500);
    },
    // Change json object for better indentation
    replacer(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
    },
    prettyPrint(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine, this.replacer);
      }
  },
   created: function () {
    this.getUser();
  }
});

app.component('Alert', {
  template: `<div><slot></slot></div>`
}
);

app.mount('#app');