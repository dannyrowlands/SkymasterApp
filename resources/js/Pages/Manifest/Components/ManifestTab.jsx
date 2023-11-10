import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";

const ManifestTab = (
    {
        state
    }
) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {state.manifestsList.map((manifest, index) => (
                <div
                    className={'bg-slate-50 rounded-lg p-3'}
                    key={manifest.order + '_div'}
                >
                    <Droppable
                        droppableId={manifest.order + '_manifest'}
                        renderClone={(provided, snapshot, rubric) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <div
                                    key={manifest.data[rubric.source.index].order + 'x'}
                                    className={'truncate w-48'}
                                >
                                    {manifest.data[rubric.source.index].individual.first_name + ' ' + manifest.data[rubric.source.index].individual.last_name}
                                </div>
                            </div>
                        )}
                    >
                        {provided => (
                            <>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"grid grid-cols-3"}
                                >
                                    <div
                                        className="font-bold pb-3 col-span-1"
                                    >
                                        Load {manifest.order}
                                    </div>
                                    <div
                                        className="col-span-1 text-center"
                                    >
                                        <button
                                            className={"font-bold"}
                                            value={'AZ'}
                                        >
                                            AZ
                                        </button>
                                    </div>
                                    <div
                                        className="col-span-1 text-right"
                                    >
                                        *
                                    </div>
                                    {manifest.data.map((item, index) => (
                                        <Draggable
                                            draggableId={manifest.order + '_' + item.id + index + '_manifest'}
                                            index={index}
                                            key={manifest.order + '_' + item.id + index + '_manifest'}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className={"col-span-2"}
                                                >
                                                    <div
                                                        key={item.order + '_x'}
                                                        className={'truncate w-48'}
                                                        onClick={(e) => handleEventClick(e, item.id)}
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
            ))}
        </div>
    )
}

export default ManifestTab
