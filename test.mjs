import * as z from 'algeria-zones';

const wilayas = z.getWilayas();
console.log('first wilaya:', wilayas[0]);

const communes = z.getCommunesByWilayaId(1);
console.log('first commune:', communes[0]);
