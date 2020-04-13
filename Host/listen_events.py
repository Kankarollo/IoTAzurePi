import asyncio
import os
from azure.eventhub.aio import EventHubConsumerClient
from Database import helpers
from configuration import EVENT_HUB_CONN_STR, EVENT_HUB_NAME


async def on_event(partition_context, event):
    try:
        received_data = eval(event.body_as_str(encoding='UTF-8'))
        print(received_data)
        helpers.save_measurement_to_database(received_data)
    except Exception as ex:
        print("Data has wrong structure:", ex)
    await partition_context.update_checkpoint(event)


async def on_partition_initialize(partition_context):
    print("Partition: {} has been initialized.".format(partition_context.partition_id))


async def on_partition_close(partition_context, reason):
    print("Partition: {} has been closed, reason for closing: {}.".format(
        partition_context.partition_id,
        reason
    ))


async def on_error(partition_context, error):
    if partition_context:
        print("An exception: {} occurred during receiving from Partition: {}.".format(
            partition_context.partition_id,
            error
        ))
    else:
        print("An exception: {} occurred during the load balance process.".format(error))


async def main():
    client = EventHubConsumerClient.from_connection_string(
        conn_str=EVENT_HUB_CONN_STR,
        consumer_group="$default",
        eventhub_name=EVENT_HUB_NAME
    )
    async with client:
        await client.receive(
            on_event=on_event,
            on_error=on_error,
            on_partition_close=on_partition_close,
            on_partition_initialize=on_partition_initialize,
            starting_position="-1",  # "-1" is from the beginning of the partition.
        )


def start_monitoring():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
