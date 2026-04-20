let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

let coin =Number(localStorage.getItem('coin')) || 50;

const price= {
  common : 5,
  uncommon : 10,
  rare : 20,
  epic : 40,
  legendary : 100
};

function kocok() {
  if (coin < 10) {
    alert('coin tidak cukup');
    return;
  }

  coin -= 10;
  updateCoin();
  localStorage.setItem('coin', coin);

  let resultText = document.getElementById('result');
  resultText.innerText = 'rolling.....';

  let rand = Math.random() * 100;
  let result = "";

  if (rand < 60) result = 'common';
  else if (rand < 70) result = 'uncommon';
  else if (rand < 85) result = 'rare';
  else if (rand < 95) result = 'epic';
  else result = 'legendary';

  let text = ["common", "uncommon", "rare", "epic", "legendary"];
  let i = 0;

  let interval = setInterval(() => {
    resultText.innerText = text[i % text.length];
    i++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    resultText.innerText = result;

    inventory.push(result);
    localStorage.setItem('inventory', JSON.stringify(inventory));

    updateInventory();
    updateGoal();
    checkWin();
  }, 1000);
  }
function updateInventory() {
  let list=
  document.getElementById('inventory');
  if (!list) return;
  list.innerHTML='';
  
  inventory.forEach((item, index) => {
    let li=
    document.createElement('li');
    li.innerText=item +'( $' + price[item] + ')';
    li.classList.add(item);
    list.appendChild(li);
    li.onclick = () => {
      li.onclick= null;
      inventory.splice(index, 1);
          coin+= price[item];
      localStorage.setItem('inventory', JSON.stringify(inventory));
      localStorage.setItem('coin',coin);
      updateInventory();
      updateCoin();
      updateGoal();
    }
    
    
  });
}

function resetInventory() {
  let yakin=confirm('yakin mau hapus item?');
   if (!yakin) return; 
   
   inventory=[];
   
   localStorage.removeItem('inventory');
   updateInventory();
   updateGoal();
}

function updateCoin() {
  let el=
  document.getElementById('coin');
  if (!el) return;
  el.innerText='coin ' + coin
  localStorage.removeItem('coin');
}

function updateGoal() {
  let legendaryCount=
  inventory.filter(item => item === 'legendary').length;
  
  document.getElementById('goal').innerText=`legendary ${legendaryCount} /3`
}

function checkWin() {
  let legendaryCount =
  inventory.filter(item => item === 'legendary').length;
  
  if (legendaryCount >= 3) {
    alert('kamu menang!!, refresh untuk mengulang game');
    document.querySelector('#spinBtn').disabled = true;
  }
}

updateInventory();
updateCoin();
