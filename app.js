const skills = [
    'UI / UX',
    'Front End Development',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node',
    'Redis',
    'MongoDB',
    'API Development',
    'Python',
    'C#',
    'Ruby',
    'Back End Development',
];
const app = Vue.createApp({
  data(){
    return {
      loading: false,
      firstName: 'John',
      lastName : 'Doe',
      email: 'john.doe@example.com',
      gender: 'female',
      picture: 'https://randomuser.me/api/portraits/men/3.jpg',
      city: 'Istanbul',
      country: 'Turkey',
      skills: skills.sort(() => .5 - Math.random()).slice(0,4),     
      rotation: 'none',
    }
  },
  methods: {
    async getUser(){
      this.rotation = 'spin';
      this.loading = true;
      // Get sub-array of first n elements after shuffled
      let randomSkills = skills.sort(() => .5 - Math.random()).slice(0,4);

      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();
      this.firstName = results[0].name.first;
      this.lastName = results[0].name.last;
      this.email = results[0].email;
      this.gender = results[0].gender;
      this.picture = results[0].picture.large;
      this.city = results[0].location.city;
      this.country = results[0].location.country;
      this.skills = randomSkills;
      this.loading = false;
      this.rotation = 'none';
    }
  }
});

app.mount('#app');