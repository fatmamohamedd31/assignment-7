
const meals = [
  {id:1,name:'Creamy tomato pasta',category:'Comfort food',tags:['quick','comfort','vegetarian'],time:25,emoji:'🍝',color:'#f0d8bd',description:'A silky tomato sauce, a little cream, and plenty of parmesan. The kind of pasta everyone asks for twice.',ingredients:['Pasta','Ripe tomatoes','Cream','Garlic','Parmesan'],steps:['Boil pasta in salted water until just tender.','Soften garlic, then simmer chopped tomatoes for 10 minutes.','Stir in cream and a splash of pasta water.','Toss together and finish with parmesan.']},
  {id:2,name:'Chicken shawarma bowls',category:'Family favourite',tags:['comfort'],time:40,emoji:'🥙',color:'#e9d8ad',description:'Warm spiced chicken with fluffy rice, crisp vegetables, and a cool garlic yoghurt sauce.',ingredients:['Chicken thighs','Rice','Yoghurt','Cucumber','Shawarma spices'],steps:['Coat chicken with spices, lemon, and oil.','Roast or pan-fry until golden and cooked through.','Cook rice until fluffy.','Serve with chopped cucumber and garlic yoghurt.']},
  {id:3,name:'One-pan lemon salmon',category:'Quick & easy',tags:['quick'],time:20,emoji:'🐟',color:'#f2d3c4',description:'Bright lemon, tender salmon, and green vegetables all come together with barely any washing up.',ingredients:['Salmon fillets','Lemon','Green beans','Olive oil','Dill'],steps:['Heat the oven to 200°C / 400°F.','Arrange salmon and green beans on a tray.','Drizzle with olive oil and lemon; season well.','Bake for 12–15 minutes and scatter with dill.']},
  {id:4,name:'Roasted veggie couscous',category:'Vegetarian',tags:['quick','vegetarian'],time:25,emoji:'🥗',color:'#dce4ca',description:'A colourful bowl of fluffy couscous, caramelised vegetables, and a bright squeeze of lemon.',ingredients:['Couscous','Courgette','Red pepper','Chickpeas','Lemon'],steps:['Chop the vegetables and roast until golden.','Cover couscous with boiling stock for 5 minutes.','Fluff with a fork and stir through chickpeas.','Top with vegetables and lemon juice.']},
  {id:5,name:'Sunday beef stew',category:'Comfort food',tags:['comfort'],time:110,emoji:'🍲',color:'#e4c8a8',description:'Slow-cooked beef, soft carrots, and a rich gravy. A cosy bowl made for sharing around the table.',ingredients:['Stewing beef','Carrots','Potatoes','Onion','Beef stock'],steps:['Brown the beef in a heavy pot.','Add onion, carrots, potatoes, and stock.','Cover and simmer gently for 1½ hours.','Season to taste and serve with warm bread.']},
  {id:6,name:'Crispy chickpea wraps',category:'Quick & easy',tags:['quick','vegetarian'],time:20,emoji:'🌯',color:'#eadab5',description:'Crunchy spiced chickpeas tucked into soft wraps with crunchy salad and a creamy tahini drizzle.',ingredients:['Chickpeas','Flatbreads','Tahini','Lettuce','Paprika'],steps:['Pat chickpeas dry and toss with paprika and oil.','Pan-fry until crisp, about 8 minutes.','Mix tahini with lemon and a little water.','Fill warm flatbreads with salad and chickpeas.']},
  {id:7,name:'Baked mac & cheese',category:'Comfort food',tags:['comfort','vegetarian'],time:45,emoji:'🧀',color:'#eed9a9',description:'Golden on top, creamy in the middle, and exactly the sort of comfort food a busy day calls for.',ingredients:['Macaroni','Cheddar','Milk','Butter','Breadcrumbs'],steps:['Cook macaroni until just underdone.','Make a sauce with butter, flour, and milk.','Melt in cheddar, then fold through the pasta.','Top with breadcrumbs and bake until golden.']},
  {id:8,name:'Egg fried rice',category:'Quick & easy',tags:['quick'],time:15,emoji:'🍚',color:'#e8dfc3',description:'A speedy, savoury favourite that turns leftover rice into a proper dinner in minutes.',ingredients:['Cooked rice','Eggs','Spring onions','Peas','Soy sauce'],steps:['Scramble eggs in a hot pan and set aside.','Stir-fry spring onions and peas for 2 minutes.','Add cold rice and soy sauce; toss until hot.','Fold the eggs back in and serve.']}
];

const grid = document.querySelector('#recipe-grid');
const resultWrap = document.querySelector('#result-wrap');
let activeFilter = 'all';
let previousPick = null;

function getVisibleMeals() {
  return activeFilter === 'all' ? meals : meals.filter(meal => meal.tags.includes(activeFilter));
}

function renderMeals() {
  const visibleMeals = getVisibleMeals();
  document.querySelector('#all-count').textContent = meals.length;
  grid.innerHTML = visibleMeals.length ? visibleMeals.map(meal => `
    <article class="recipe-card" tabindex="0" role="button" aria-label="See recipe for ${meal.name}" data-meal-id="${meal.id}">
      <div class="card-image" style="background:${meal.color}"><span class="card-emoji">${meal.emoji}</span><span class="card-time">◷ ${meal.time} min</span></div>
      <div class="card-copy"><h3>${meal.name}</h3><p>${meal.description}</p><span class="card-category">${meal.category}</span></div>
    </article>`).join('') : '<div class="empty-state">No recipes in this category yet.</div>';
}

function showMeal(meal) {
  if (!meal) return;
  previousPick = meal.id;
  document.querySelector('#meal-name').textContent = meal.name;
  document.querySelector('#meal-description').textContent = meal.description;
  document.querySelector('#meal-category').textContent = meal.category;
  document.querySelector('#meal-time').textContent = `${meal.time} min`;
  document.querySelector('#result-emoji').textContent = meal.emoji;
  document.querySelector('#result-image').style.background = meal.color;
  document.querySelector('#meal-ingredients').innerHTML = meal.ingredients.map(item => `<li>${item}</li>`).join('');
  document.querySelector('#meal-steps').innerHTML = meal.steps.map(step => `<li>${step}</li>`).join('');
  resultWrap.hidden = false;
  resultWrap.scrollIntoView({behavior:'smooth',block:'start'});
}

function pickRandomMeal() {
  const pool = activeFilter === 'all' ? meals : getVisibleMeals();
  const choices = pool.filter(meal => meal.id !== previousPick);
  const options = choices.length ? choices : pool;
  const randomIndex = Math.floor(Math.random() * options.length);
  showMeal(options[randomIndex]);
}

document.querySelector('#pick-meal').addEventListener('click', pickRandomMeal);
document.querySelector('#pick-again').addEventListener('click', pickRandomMeal);
document.querySelector('#close-result').addEventListener('click', () => { resultWrap.hidden = true; });

document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('.filter');
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(filter => filter.classList.toggle('active', filter === button));
  renderMeals();
});

grid.addEventListener('click', event => {
  const card = event.target.closest('.recipe-card');
  if (card) showMeal(meals.find(meal => meal.id === Number(card.dataset.mealId)));
});

grid.addEventListener('keydown', event => {
  const card = event.target.closest('.recipe-card');
  if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); showMeal(meals.find(meal => meal.id === Number(card.dataset.mealId))); }
});

renderMeals();
