import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";

const JumpersList = (
    {
        state
    }
) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Droppable
                className={'pl-6 truncate w-64'}
                droppableId={'jumpersList'}
                renderClone={(provided, snapshot, rubric) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div
                            key={state.jumpers[rubric.source.index].id+'x'+rubric.source.index}
                            className={'pl-6 truncate w-64'}
                        >
                            {state.jumpers[rubric.source.index].individual.first_name + ' ' + state.jumpers[rubric.source.index].individual.last_name}
                        </div>
                    </div>
                )}
            >
                {provided => (
                    <>
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <p className="font-bold pb-3 pt-3">Parachutists</p>
                            {state.jumpers.map((item, index) => (
                                <Draggable
                                    draggableId={item.id+item.individual.first_name+item.individual.last_name+item.individual_id+index+'jdrag'}
                                    index={index}
                                    key={index}
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

export default JumpersList
