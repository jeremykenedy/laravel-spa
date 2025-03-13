import { AbilityBuilder, createMongoAbility } from '@casl/ability'

const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

export default build();
