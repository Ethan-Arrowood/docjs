type Documentation = Page[]

interface Page {
  title: string; // # Foo
  description: string; // > Foo is a thing
}

interface ModulePage extends Page {
  methods: MethodBlock[]; // ## Methods
  events: EventBlock[]; // ## Events
}

interface ClassPage extends Page {
  classes: ClassBlock[];
}

interface StructurePage extends Page {

}

interface Block {
  name: string;
  description?: string;
}

interface ClassBlock extends Block {
  /* name // ## Class: Foo */
  constructor: MethodBlock; // ### `new Foo()`
  staticMethods: MethodBlock[]; // ### Static Methods
  instance: {
    methods: MethodBlock[]; // ### Instance Methods
    events: EventBlock[]; // ### Instance Events
    properties: PropertyBlock[]; // ### InstanceProperties
  }
}

interface MethodBlock extends Block {
  /* name // ### | #### `objectName.methodName(required[, optional])` */
  arguments: {
    required: ArgumentBlock[];
    optional: ArgumentBlock[];
  };
  returns: ReturnBlock; // Returns [TYPE] - Return description
}

interface EventBlock extends Block {
  /* name // ### | #### Event: Foo */
  returns: ReturnBlock;
}

// Returns:
// * `name` type
interface ReturnBlock extends Block {
  type: Type;
}

interface PropertyBlock extends Block {
  /* name // ### | #### objectName.propertName */
  type: Type;
}

interface ArgumentBlock extends Block {
  type: Type;
  default: string;
  platforms: Platform[];
}

type Type = any /* 'String' | 'Number' | 'Object' | 'Array' | 'Boolean' */;
type Platform = 'macOS' | 'Windows' | 'Linux';
