import { randomUUID } from 'node:crypto'
import { Kafka, Partitioners } from 'kafkajs'

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['localhost:9091'],
  })
  
  const producer = kafka.producer()
  
  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      { value: JSON.stringify({
        content: 'Voce recebeu um novo desafio',
        category: 'social',
        recipientId: randomUUID()})
      },
    ],
  })
  
  await producer.disconnect()
}

bootstrap()
