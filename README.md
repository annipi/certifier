# certifier


Truffle
init -> inicializar un proyecto
compile -> compila y se obtiene el json con el bytecode
migrate -> pasa a la cadena de bloques los contratos ya compilados
test ->     
console ->

truffle.js -> module.exports http://truffleframework.com/docs/advanced/configuration 
    se especifica en donde esta correindo la cadena de bloques
migrations/2-certifier -> se lanza una instancia del contrato Certifier
contracts/Certifier -> contrato inteligente
test/TestCertifier -> se escriben los test TDD
```
truffle console
compile
migrate -> migrate --reset (fuerza a migrar nuevamente los contratos)
----------------------------------------------------------------------------------------------------------------------------
accts = web3.eth.accounts ====> lista las cuentas en ganache
web3.eth.getTransaction('0x6b6ceab424098649165ed6ba06846b13d6034efef17066c124ccc2eb8704c885') ====> 'Resultado de Migrate'

acc0 = accts[0]
acc1 = accts[1]
Certifier.deployed().then(instance => certifier = instance)
certifier.addCourse('SC','Solidity course',3, 45, 80, ['abc','cde','efg'])
certifier.addCourse('SC','Solidity course',3, 45, 80, ['abc','cde','efg'], {from: acc1})
txAC= web3.eth.getTransaction('0x6b6ceab424098649165ed6ba06846b13d6034efef17066c124ccc2eb8704c885')
course = certifier.getCourse('SC')
course.then(c => {c[1]})
course.then(console.log(c => {c[1]}))
web3.eth.getBalance(acc0)
web3.eth.getBalance(acc0).toFixed()
`${web3.fromWei(web3.eth.getBalance(acc0),'ether')} ETH`

bal = acc => console.log(`${web3.fromWei(web3.eth.getBalance(acc), 'ether')} ETH`)
accts.forEach(bal)
student1 = accts[2]
student2 = accts[3]
certifier.subscribe('SC', 'Julian', 'Jimenez', 25, 'j@j.com', {from: student1, value: web3.toWei(3,'ether')})
certifier.subscribe('SC', 'Julian', 'Jimenez', 25, 'j@j.com', {from: student1, value: web3.toWei(3.2,'ether')})
```
