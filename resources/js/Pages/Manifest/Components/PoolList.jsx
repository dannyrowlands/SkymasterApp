import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";

const PoolList = (
    {
        state
    }
) => {
    return (
        <div className="grid grid-cols-4 gap-4">

            <Droppable
                className={'pl-6 truncate w-64'}
                droppableId={'poolList'}
                renderClone={(provided, snapshot, rubric) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div
                            key={state.pool[rubric.source.index].individual.id+'x'+rubric.source.index}
                            className={'pl-6 truncate w-64'}
                        >
                            {state.pool[rubric.source.index].individual.first_name + ' ' + state.pool[rubric.source.index].individual.last_name}
                        </div>
                    </div>
                )}
            >
                {provided => (
                    <>
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <p className="font-bold pb-3">Ready</p>
                            {state.pool.map((item, index) => (
                                <Draggable
                                    draggableId={item.id+item.individual.first_name+item.individual.last_name+item.individual.id+index+'pdrag'}
                                    index={index}
                                    key={item.id+item.individual.first_name+item.individual.last_name+item.individual.id+'pdrag'}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <div
                                                key={item.id+'x'+index}
                                                className={'pl-6 truncate w-64'}
                                            >
                                                {item.individual.first_name + ' ' + item.individual.last_name}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                        {provided.placeholder}
                    </>
                )}
            </Droppable>

        </div>
    )
}

export default PoolList
