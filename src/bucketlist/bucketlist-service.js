const CleanupsService = {
    getItems(db, user_id) {
      return db
        .select(
          'id', 'item', 'completed'
        )
        .from(
            'items'
        )
        .where(
            'user_id', user_id 
        )
    },
    getTasks(db, user_id, item_id) {
        return db
          .select(
            'tasks.item', 'tasks.id', 'task', 'tasks.completed'
          )
          .from(
              'tasks'
          )
          .join('items', 'items.id', 'tasks.item')
          .where(
              'user_id', user_id
          )
          .andWhere(
              'items.id', item_id
          )
      },
    patchItem(db, user_id, item_id, completed) {
        return db  
            .from('items')
            .where('user_id', '=', user_id)
            .andWhere('id', '=', item_id)
            .update({
                completed: completed,
                thisKeyIsSkipped: undefined
            })    
    },
    patchTask(db, user_id, item_id, task_id, completed) {
        console.log('item_id')
        console.log(item_id)
        console.log('task_id')
        console.log(task_id)
        return db 
            .raw(
                `UPDATE 
                    tasks 
                SET 
                    completed = ${completed} 
                FROM 
                    items 
                WHERE 
                    items.user_id = ${user_id} 
                AND 
                    tasks.item = ${item_id} 
                AND 
                    tasks.id = ${task_id}`
            )
            /*.from('items')
            .where('items.user_id', '=', user_id)
            .andWhere('tasks.item', '=', item_id)
            .andWhere('tasks.id', '=', task_id)
            .update({
                completed: completed,
                thisKeyIsSkipped: undefined
            })*/
    },
    insertTask(db, insert) {
        return db
    }

};

module.exports = CleanupsService;