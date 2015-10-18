class ExtendedSet extends Set {

    update(objects) {
        for (let obj of objects) {
            this.add(obj)
        }
    }

    diff_update(objects) {
        for (let obj of objects) {
            this.delete(obj)
        }
    }

    static union(...extended_sets) {
        let result = new ExtendedSet();
        for (let extended_set of extended_sets) {
            result.update(extended_set)
        }
        return result
    }

    static intersect(base_set, ...extended_sets) {
        let result = new ExtendedSet(base_set);
        for (let extended_set of extended_sets) {
            for (let obj of result) {
                if (!extended_set.has(obj)) {
                    result.delete(obj)
                }
            }
        }
        return result
    }
}

module.exports = ExtendedSet;