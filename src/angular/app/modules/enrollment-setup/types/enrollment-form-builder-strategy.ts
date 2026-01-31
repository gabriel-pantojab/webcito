import { FormGroup } from '@angular/forms';

import { UseCase } from '@core/interfaces/use-case';

export type EnrollmentFormBuilderStrategy = UseCase<void, FormGroup>;
