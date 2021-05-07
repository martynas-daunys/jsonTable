//neturetu but cia
var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        if(fn!==undefined)
        fn(data);
      });
    }
  },
  get: function (eventName){
    if (this.events[eventName]) {
      return this.events[eventName];
    }
  }
};

document.addEventListener('readystatechange', (event) => {
  if (document.readyState === "complete")
  events.emit('complete','1');
});

const t0 = performance.now();
var jsonTable=function(){
  var ob_temp={};
  function init(ob){
    events.on('complete',load_table_v2(ob));
    events.on('complete',add_events(ob));
  }
  function set(ob){
    if(!(typeof ob === 'object' && ob !== null)){console.error('Not an objext');
    console.error('Fail to load data');
      console.trace();
    return false;}
    init(ob);
  }
  function add_events(ob){
    document.getElementById(ob.id).addEventListener('click', function (event) {
	if (!event.target.matches('td')) return;
  if((typeof ob_temp.laset_el === 'object' && ob_temp.laset_el !== null))
  ob_temp.laset_el.parentNode.classList.remove('good');
  ob_temp.laset_el=event.target;//paima nuaja
  document.getElementById('json').value=ob_temp.laset_el.innerHTML;
  ob_temp.laset_el.parentNode.classList.add('good');
	event.preventDefault();}, false);
  }
  function speed(ob){
    var tx=ob.des+` took ${ob.t1-ob.t0} milliseconds.`;
    var div=document.createElement('div');
    div.innerHTML=tx;
    document.getElementById('main_sis').appendChild(div);
    console.log(ob.des+` took ${ob.t1-ob.t0} milliseconds.`);
  }
  function show_table(ob){

    console.error('WARNING Reikai logikos tikrinimas json stukturai');
    const t0 = performance.now();
    var myTable = document.getElementById(ob.id);
    var dataTable = new DataTable(myTable, {data: ob.data,perPageSelect: [5, 10, 15, 20, 1000,ob.data.rows.length]});
    jsonTable.speed({'t0':t0,'t1':performance.now(),'des':'show_table TABLE LOAD'});
  }
  function load_table_v2(ob){
    load_table(ob);
    //console.log(ob);
  }
  function load_table(ob){
    //alert(ob.file);
    const t0 = performance.now();
    if(!(typeof ob === 'object' && ob !== null)){console.error('Not an objext');
      console.trace();
    return false;}
    // ob.file betkoks failas ar linkas is API atsakymas turetu but truktura
    fetch(ob.file).then(response => response.json())
    .then(data => {ob.data=data;jsonTable.speed({'t0':t0,'t1':performance.now(),'des':'load_table TABLE DATA LOAD JSON '});show_table(ob);})
    .catch(error => console.log(error));

    //data.rows=[...data.rows,...data.rows,...data.rows,...data.rows,...data.rows];
    //data.rows=[...data.rows,...data.rows,...data.rows,...data.rows,...data.rows];
    //console.log(data_new);
    //data.rows=Object.assign({}, data_new);
    //data.rows.push(data.rows,data.rows);

  }

  return {init:init,set:set,load_table:load_table,speed:speed}
}();
jsonTable.speed({'t0':t0,'t1':performance.now(),'des':'MAIN FULL load'});

//jsonTable.load_table({id:'basic',file:"http://localhost/sapnai_new/Vanilla-DataTables-master/data1.json"});