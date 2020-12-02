type Documentation = Page[]

type PageTypes = 'Module' | 'Class' | 'Structure' | 'Global'

interface Page {
  title: string; // # Foo
  description: string; // > Foo is a thing
  slug: string;
  websiteUrl: string;
  repoUrl: string;
  version: string;
  type: PageTypes;
}

interface ModulePage extends Page {
  type: 'Module';
  methods: MethodBlock[]; // ## Methods
  events: EventBlock[]; // ## Events
  classes: ClassBlock[];
  process?: string | string[]; // Process:
}

interface ClassPage extends Page {
  type: 'Class';
  classes: ClassBlock[]; // ## Class:
}

interface StructurePage extends Page {
  type: 'Structure';
  properties: PropertyBlock[];
  extends?: string;
}

interface GlobalPage extends Page {
  type: 'Global';
  classes: ClassBlock[];
  methods: MethodBlock[];
  properties: PropertyBlock[];
}

interface Block {
  name: string;
  description?: string;
}

interface ClassBlock extends Block {
  /* name // ## Class: <Class> */
  /* description // > <Class is a thing> */
  constructor: MethodBlock; // ### `new Class()`
  staticMethods: MethodBlock[]; // ### Static Methods
  instance: {
    methods: MethodBlock[]; // ### Instance Methods
    events: EventBlock[]; // ### Instance Events
    properties: PropertyBlock[]; // ### InstanceProperties
  };
  process?: string | string[]; // Process: <process>
  extends?: string; // extends <Class>
}

interface MethodBlock extends Block {
  /* name // ### | #### `objectName.<methodName>(required[, optional])` */
  /* description // > <methodName is a thing> */
  arguments: ArgumentBlock[]; // ### | #### `objectName.methodName(<required[, optional]>)`
  returns: ReturnBlock; // Returns [type] - Return description
}

interface EventBlock extends Block {
  /* name // ### | #### Event: <Foo> */
  /* description // > <Foo is a thing> */
  returns: ReturnBlock;
}

// Returns:
// * `name` type
interface ReturnBlock extends Block {
  /* name // * `<name>` */
  /* description // * `name` type - <description> */
  type: Type; // * `name` <type>
}

interface PropertyBlock extends Block {
  /* name // ### | #### objectName.<propertName> */
  type: Type;
  required: boolean;
}

interface ArgumentBlock extends Block {
  type: Type;
  default: string;
  required: boolean;
  platforms: Platform[];
}

type Type = any; /* 'String' | 'Number' | 'Object' | 'Array' | 'Boolean' */;
type Platform = 'macOS' | 'Windows' | 'Linux';