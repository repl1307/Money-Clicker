function Achievement(name, description, effect){
   this.name = name;
   this.description = description;
   this.effect = () => { effect(this) };
   return this;
}